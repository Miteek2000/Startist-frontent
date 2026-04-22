import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, archivo, descripcion, tarjeta_id } = body;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_TOKEN = process.env.API_TOKEN;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/proyectos`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        titulo,
        archivo,
        descripcion,
        tarjeta_id,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('API error:', error);
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/proyectos:', error);
    return NextResponse.json(
      { error: 'Error uploading project' },
      { status: 500 }
    );
  }
}
