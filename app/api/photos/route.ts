import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock photo data
const mockPhotos = [
  {
    id: '1',
    filename: 'presentation-view.png',
    file_size: 1024000,
    file_type: 'image/png',
    title: '学生団体Youth Intersection主催交流会',
    category: 'イベント',
    date: '2025-04-27T00:00:00.000Z',
    url: 'https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/presentation%20view.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9wcmVzZW50YXRpb24gdmlldy5wbmciLCJpYXQiOjE3NDg4NTgyMzUsImV4cCI6MTc4MDM5NDIzNX0.eBOBk2yJM62YcbPl1J413L4knlG9dd5FatO71iemQfw',
    created_at: '2025-04-27T00:00:00.000Z'
  },
  {
    id: '2',
    filename: 'newspaper-entre-lab.png',
    file_size: 2048000,
    file_type: 'image/png',
    title: '朝日新聞社中高生新聞掲載',
    category: 'メディア掲載',
    date: '2025-04-20T00:00:00.000Z',
    url: 'https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/newspaper%20entre%20lab.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzcGFwZXIgZW50cmUgbGFiLnBuZyIsImlhdCI6MTc0ODg1ODc1NCwiZXhwIjoxNzgwMzk0NzU0fQ.MaNrwU3E6UFYwna4OKVvWfrbFDByzDIAkP5pK4A1ZgU',
    created_at: '2025-04-20T00:00:00.000Z'
  },
  {
    id: '3',
    filename: 'view-of-mtg.png',
    file_size: 1536000,
    file_type: 'image/png',
    title: '第二回ワークショップ開催',
    category: 'ワークショップ',
    date: '2025-03-30T00:00:00.000Z',
    url: 'https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/view%20of%20MTG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by92aWV3IG9mIE1URy5wbmciLCJpYXQiOjE3NDg4NTg4MjQsImV4cCI6MTc4MDM5NDgyNH0.6Yb4fGsyOgDR1u8DjirOYODhFA9sTx2JzowuQJo6bHE',
    created_at: '2025-03-30T00:00:00.000Z'
  }
];

export async function GET() {
  try {
    // Return mock photos
    return NextResponse.json({ photos: mockPhotos }, { status: 200 });
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
    
    // Mock upload - in a real app, you would save to your storage
    console.log("Mock upload:", fileName);
    
    // Create mock photo data
    const photoData = {
      id,
      filename: file.name,
      file_size: file.size,
      file_type: file.type,
      title,
      category,
      date: date.toISOString(),
      url: `/mock-photos/${fileName}`, // Mock URL
      created_at: new Date().toISOString()
    };

    console.log("Mock save successful:", photoData);

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