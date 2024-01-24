import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>$DAI.ly Transfers</title>
      <body>
        <main className="bg-black min-h-screen w-full text-gray-300">
          {children}
        </main>
      </body>
    </html>
  );
}
