import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Adding generateStaticParams to make compatible with static export
export async function generateStaticParams() {
  // For static export, we'll return an empty array
  return [];
}

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