import { NextResponse } from 'next/server';

// Adding generateStaticParams to make compatible with static export
export async function generateStaticParams() {
  // For static export, we'll just return an empty array
  // This tells Next.js not to pre-render any specific photo ID pages
  return [];
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Mock implementation - in a real app, you would delete from your data source
    // For now, just return success
    console.log(`Mock delete photo with id: ${id}`);
    
    return NextResponse.json({ 
      message: "写真が正常に削除されました" 
    }, { status: 200 });
  } catch (error) {
    console.error("写真の削除中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真の削除に失敗しました" }, { status: 500 });
  }
}