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
  },
  {
    id: '5',
    filename: 'hana.jpg',
    file_size: 148000,
    file_type: 'image/jpeg',
    title: 'はな - メンバー写真',
    category: 'メンバー',
    date: '2025-07-27T00:00:00.000Z',
    url: '/images/hana.jpg',
    created_at: '2025-07-27T00:00:00.000Z'
  },
  {
    id: '6',
    filename: 'representative.jpg',
    file_size: 214000,
    file_type: 'image/jpeg',
    title: '代表 - 団体代表者の写真',
    category: 'メンバー',
    date: '2025-07-27T00:00:00.000Z',
    url: '/images/representative.jpg',
    created_at: '2025-07-27T00:00:00.000Z'
  },
  // ワークショップ
  {
    id: '7',
    filename: '20260315-project-fair.jpg',
    file_size: 449366,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】プロジェクトフェア',
    category: 'ワークショップ',
    date: '2026-03-15T00:00:00.000Z',
    url: '/images/uniring/20260315-project-fair.jpg',
    created_at: '2026-03-15T00:00:00.000Z'
  },
  {
    id: '8',
    filename: '20260202-wellbeing-training.jpg',
    file_size: 499892,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】駒場学園高校ウェルビーイング委員会研修',
    category: 'ワークショップ',
    date: '2026-02-02T00:00:00.000Z',
    url: '/images/uniring/20260202-wellbeing-training.jpg',
    created_at: '2026-02-02T00:00:00.000Z'
  },
  {
    id: '9',
    filename: '20251130-tsg-fair.jpg',
    file_size: 1143368,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展',
    category: 'ワークショップ',
    date: '2025-11-30T00:00:00.000Z',
    url: '/images/uniring/20251130-tsg-fair.jpg',
    created_at: '2025-11-30T00:00:00.000Z'
  },
  {
    id: '10',
    filename: '20250908-komaba-kigyo-lab5.jpg',
    file_size: 369719,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】駒場学園高校 起業LAB 5期',
    category: 'ワークショップ',
    date: '2025-09-08T00:00:00.000Z',
    url: '/images/uniring/20250908-komaba-kigyo-lab5.jpg',
    created_at: '2025-09-08T00:00:00.000Z'
  },
  {
    id: '11',
    filename: '20250803-tsg-fair.jpg',
    file_size: 334248,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展',
    category: 'ワークショップ',
    date: '2025-08-03T00:00:00.000Z',
    url: '/images/uniring/20250803-tsg-fair.jpg',
    created_at: '2025-08-03T00:00:00.000Z'
  },
  {
    id: '12',
    filename: '20250330-tsg-fair.jpg',
    file_size: 359219,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展',
    category: 'ワークショップ',
    date: '2025-03-30T00:00:00.000Z',
    url: '/images/uniring/20250330-tsg-fair.jpg',
    created_at: '2025-03-30T00:00:00.000Z'
  },
  {
    id: '13',
    filename: '20250120-komaba-kigyo-lab4.jpg',
    file_size: 395278,
    file_type: 'image/jpeg',
    title: '【ワークショップ開催】駒場学園高校 起業LAB 4期',
    category: 'ワークショップ',
    date: '2025-01-20T00:00:00.000Z',
    url: '/images/uniring/20250120-komaba-kigyo-lab4.jpg',
    created_at: '2025-01-20T00:00:00.000Z'
  },
  // イベント
  {
    id: '14',
    filename: '20260325-2nd-anniversary.jpg',
    file_size: 318457,
    file_type: 'image/jpeg',
    title: 'Üniring 2nd Anniversary party',
    category: 'イベント',
    date: '2026-03-25T00:00:00.000Z',
    url: '/images/uniring/20260325-2nd-anniversary.jpg',
    created_at: '2026-03-25T00:00:00.000Z'
  },
  {
    id: '15',
    filename: '20250628-eduvision2025.jpg',
    file_size: 882973,
    file_type: 'image/jpeg',
    title: 'iGO主催 EDUVISON 2025 登壇',
    category: 'イベント',
    date: '2025-06-28T00:00:00.000Z',
    url: '/images/uniring/20250628-eduvision2025.jpg',
    created_at: '2025-06-28T00:00:00.000Z'
  },
  {
    id: '16',
    filename: '20250324-crowdfunding-success.png',
    file_size: 913829,
    file_type: 'image/png',
    title: 'クラウドファンディング目標達成',
    category: 'イベント',
    date: '2025-03-24T00:00:00.000Z',
    url: '/images/uniring/20250324-crowdfunding-success.png',
    created_at: '2025-03-24T00:00:00.000Z'
  },
  {
    id: '17',
    filename: '20250222-myproject-summit.jpg',
    file_size: 383101,
    file_type: 'image/jpeg',
    title: '「ハラスメントのメタ認知」マイプロジェクトアワード地域summit advanced出場',
    category: 'イベント',
    date: '2025-02-22T00:00:00.000Z',
    url: '/images/uniring/20250222-myproject-summit.jpg',
    created_at: '2025-02-22T00:00:00.000Z'
  },
  {
    id: '18',
    filename: '20250214-myproject-award.jpg',
    file_size: 372453,
    file_type: 'image/jpeg',
    title: '「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」「ハラスメントのメタ認知」マイプロジェクトアワード特別賞受賞',
    category: 'イベント',
    date: '2025-02-14T00:00:00.000Z',
    url: '/images/uniring/20250214-myproject-award.jpg',
    created_at: '2025-02-14T00:00:00.000Z'
  },
  {
    id: '19',
    filename: '20250214-crowdfunding-start.jpg',
    file_size: 154098,
    file_type: 'image/jpeg',
    title: 'クラウドファンディング開始',
    category: 'イベント',
    date: '2025-02-14T00:00:00.000Z',
    url: '/images/uniring/20250214-crowdfunding-start.jpg',
    created_at: '2025-02-14T00:00:00.000Z'
  },
  {
    id: '20',
    filename: '20240325-kigyo-lab-grandprix.jpg',
    file_size: 1431382,
    file_type: 'image/jpeg',
    title: 'TOKYO EDUCATION LAB主催 駒場学園高校「起業LAB」最終プレゼンテーション大会 最優秀賞受賞',
    category: 'イベント',
    date: '2024-03-25T00:00:00.000Z',
    url: '/images/uniring/20240325-kigyo-lab-grandprix.jpg',
    created_at: '2024-03-25T00:00:00.000Z'
  },
  // メディア掲載
  {
    id: '21',
    filename: '20250430-tokyo-shimbun.jpg',
    file_size: 529394,
    file_type: 'image/jpeg',
    title: '東京新聞掲載',
    category: 'メディア掲載',
    date: '2025-04-30T00:00:00.000Z',
    url: '/images/uniring/20250430-tokyo-shimbun.jpg',
    created_at: '2025-04-30T00:00:00.000Z'
  },
  {
    id: '22',
    filename: '20250429-asahi-shimbun.jpg',
    file_size: 262856,
    file_type: 'image/jpeg',
    title: '朝日新聞掲載',
    category: 'メディア掲載',
    date: '2025-04-29T00:00:00.000Z',
    url: '/images/uniring/20250429-asahi-shimbun.jpg',
    created_at: '2025-04-29T00:00:00.000Z'
  },
  {
    id: '23',
    filename: '20250420-asahi-junior.jpg',
    file_size: 697719,
    file_type: 'image/jpeg',
    title: '朝日新聞中高生新聞掲載',
    category: 'メディア掲載',
    date: '2025-04-20T00:00:00.000Z',
    url: '/images/uniring/20250420-asahi-junior.jpg',
    created_at: '2025-04-20T00:00:00.000Z'
  },
  // メンバー
  {
    id: '24',
    filename: 'member-terai-hanan.jpg',
    file_size: 151674,
    file_type: 'image/jpeg',
    title: '寺井葉南 - 宣材写真',
    category: 'メンバー',
    date: '2025-03-02T00:00:00.000Z',
    url: '/images/uniring/member-terai-hanan.jpg',
    created_at: '2025-03-02T00:00:00.000Z'
  },
  {
    id: '25',
    filename: 'member-ishibashi-mayu.jpeg',
    file_size: 5488973,
    file_type: 'image/jpeg',
    title: '石橋舞優 - 宣材写真',
    category: 'メンバー',
    date: '2025-03-02T00:00:00.000Z',
    url: '/images/uniring/member-ishibashi-mayu.jpeg',
    created_at: '2025-03-02T00:00:00.000Z'
  },
  // その他
  {
    id: '26',
    filename: 'about-us.jpg',
    file_size: 244031,
    file_type: 'image/jpeg',
    title: '私たちについて',
    category: 'その他',
    date: '2025-04-25T00:00:00.000Z',
    url: '/images/uniring/about-us.jpg',
    created_at: '2025-04-25T00:00:00.000Z'
  },
  {
    id: '27',
    filename: 'inquiry-program.jpg',
    file_size: 2660629,
    file_type: 'image/jpeg',
    title: '探究プログラムとの出会い',
    category: 'その他',
    date: '2025-04-25T00:00:00.000Z',
    url: '/images/uniring/inquiry-program.jpg',
    created_at: '2025-04-25T00:00:00.000Z'
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