import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { getPreview, updatePreviewStatus, deletePreview } from "@/lib/kv/previews";

// GET: get a single preview with full image data
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const preview = await getPreview(id);
  if (!preview) {
    return NextResponse.json({ error: "Preview non trouve" }, { status: 404 });
  }
  return NextResponse.json({ preview });
}

// PUT: update preview status (approve/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const status = body.status as "approved" | "rejected";

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Status invalide" }, { status: 400 });
  }

  await updatePreviewStatus(id, status);
  return NextResponse.json({ success: true });
}

// DELETE: delete a preview
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  await deletePreview(id);
  return NextResponse.json({ success: true });
}
