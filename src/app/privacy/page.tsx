export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 md:p-24 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-zinc-400">Last updated: February 02, 2026</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p className="text-zinc-500 leading-relaxed">
          Welcome to Lumina AI. We respect your privacy and are committed to protecting your personal data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Data Collection</h2>
        <p className="text-zinc-500 leading-relaxed">
          We collect personal information such as your email address when you sign up, and business details when you generate a website.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Use of Data</h2>
        <p className="text-zinc-500 leading-relaxed">
          The data collected is used to provide our AI-driven website generation services, manage your subscription, and improve our platform.
        </p>
      </section>

      <footer className="pt-20 text-[10px] text-zinc-700 uppercase font-bold tracking-widest">
         © 2026 Lumina AI Website Builder
      </footer>
    </div>
  )
}
