import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock photo data using local images
const mockPhotos = [
  {
    id: '1',
    filename: 'uniring-logo.png',
    file_size: 84116,
    file_type: 'image/png',
    title: 'Üniringロゴ - 団体のメインロゴ',
    category: 'ロゴ・ブランディング',
    date: '2025-04-25T00:00:00.000Z',
    url: '/images/uniring-logo.png',
    created_at: '2025-04-25T00:00:00.000Z'
  },
  {
    id: '2',
    filename: 'tsubasa-logo.png',
    file_size: 1634328,
    file_type: 'image/png',
    title: 'つばさロゴ - プロジェクトロゴ',
    category: 'ロゴ・ブランディング',
    date: '2025-05-21T00:00:00.000Z',
    url: '/images/tsubasa-logo.png',
    created_at: '2025-05-21T00:00:00.000Z'
  },
  {
    id: '3',
    filename: 'h-logo.png',
    file_size: 1572237,
    file_type: 'image/png',
    title: 'Hロゴ - 完成版',
    category: 'ロゴ・ブランディング',
    date: '2025-05-21T00:00:00.000Z',
    url: '/images/h-logo.png',
    created_at: '2025-05-21T00:00:00.000Z'
  },
  {
    id: '4',
    filename: 'student-id.jpg',
    file_size: 304581,
    file_type: 'image/jpeg',
    title: '学生証 - メンバー紹介',
    category: 'メンバー',
    date: '2025-07-10T00:00:00.000Z',
    url: '/images/student-id.jpg',
    created_at: '2025-07-10T00:00:00.000Z'
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