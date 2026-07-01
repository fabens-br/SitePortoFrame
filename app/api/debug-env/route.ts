import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json({ status: "Error", message: "DATABASE_URL is not set" }, { status: 500 });
  }

  try {
    // A string de conexão típica do MongoDB é do formato:
    // mongodb+srv://username:password@cluster.mongodb.net/database?options
    // Podemos mascarar a senha ou extrair apenas host e banco.
    
    // Tentaremos usar o parser da URL, mas o mongodb+srv às vezes requer cuidado.
    // Substituímos o mongodb+srv para http temporariamente para que o construtor nativo de URL o parseie facilmente.
    const urlString = dbUrl.replace("mongodb+srv://", "http://").replace("mongodb://", "http://");
    const parsedUrl = new URL(urlString);

    const debugInfo = {
      protocol: dbUrl.split("://")[0],
      host: parsedUrl.hostname,
      database: parsedUrl.pathname.replace("/", ""),
      hasUsername: !!parsedUrl.username,
      hasPassword: !!parsedUrl.password,
      queryOptions: parsedUrl.search,
      nodeEnv: process.env.NODE_ENV,
    };

    return NextResponse.json({
      message: "Diagnostic Information",
      ...debugInfo
    });

  } catch (error) {
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to parse DATABASE_URL", 
      error: String(error) 
    }, { status: 500 });
  }
}
