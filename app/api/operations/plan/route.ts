import { NextResponse } from "next/server";
import { createOperationPlan } from "@/lib/createOperationPlan";
import { researchWithExa } from "@/services/exa";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      operation?: string;
    };

    const operation = body.operation?.trim();

    if (!operation) {
      return NextResponse.json(
        { error: "Operation is required." },
        { status: 400 },
      );
    }

    const researchBrief = await researchWithExa(operation);
    const plan = createOperationPlan(operation, { researchBrief });

    return NextResponse.json({ plan });
  } catch {
    return NextResponse.json(
      { error: "Failed to create operation plan." },
      { status: 500 },
    );
  }
}