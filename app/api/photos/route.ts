import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error("写真の取得中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真の取得に失敗しました" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error("ファイルが見つかりません");
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }

    // ファイルタイプの検証
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      console.error(`無効なファイル形式です: ${file.type}`);
      return NextResponse.json({ error: `無効なファイル形式です: ${file.type}` }, { status: 400 });
    }

    // ファイルサイズの検証 (10MB制限)
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      console.error(`ファイルサイズが大きすぎます: ${file.size} bytes`);
      return NextResponse.json({ error: "ファイルサイズが制限を超えています（最大10MB）" }, { status: 400 });
    }

    // メタデータの取得
    const title = formData.get('title')?.toString() || file.name.split('.')[0];
    const category = formData.get('category')?.toString() || 'その他';
    const date = formData.get('date') ? new Date(formData.get('date') as string) : new Date();

    // ファイル名の生成
    const id = uuidv4();
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${id}.${fileExt}`;

    console.log(`処理中のファイル: ${file.name}, サイズ: ${file.size}, タイプ: ${file.type}`);
    
    // ファイルをバッファに変換
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabaseのストレージにアップロード
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('photos')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("ストレージへのアップロード中にエラーが発生しました:", uploadError);
      throw uploadError;
    }

    console.log("ストレージへのアップロードが成功しました:", fileName);

    // 公開URLの取得
    const { data: { publicUrl } } = supabase
      .storage
      .from('photos')
      .getPublicUrl(fileName);

    console.log("公開URL:", publicUrl);

    // メタデータをデータベースに保存
    const { data: photoData, error: insertError } = await supabase
      .from('photos')
      .insert({
        id,
        filename: file.name,
        file_size: file.size,
        file_type: file.type,
        title,
        category,
        date: date.toISOString(),
        url: publicUrl
      })
      .select()
      .single();

    if (insertError) {
      console.error("データベースへの保存中にエラーが発生しました:", insertError);
      
      // ストレージからファイルを削除（ロールバック）
      await supabase.storage.from('photos').remove([fileName]);
      
      throw insertError;
    }

    console.log("データベースへの保存が成功しました:", photoData);

    return NextResponse.json({ 
      message: "写真が正常にアップロードされました", 
      photo: photoData 
    }, { status: 201 });
  } catch (error) {
    console.error("写真のアップロード中にエラーが発生しました:", error);
    return NextResponse.json({ 
      error: "写真のアップロードに失敗しました", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}