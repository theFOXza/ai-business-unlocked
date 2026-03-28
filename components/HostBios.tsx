import Image from 'next/image';

export default function HostBios() {
  return (
    <section className="py-16">
      <div className="container-pad">
        <h2 className="section-title">Meet Your Hosts</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <Image
                src="/pj-headshot.jpg"
                alt="PeterJohn Fox"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-navy">PETERJOHN FOX</p>
                <p className="text-sm text-text/70">AI-first business builder</p>
              </div>
            </div>
            <p className="mt-4 text-base text-text/80">
              PeterJohn has been using AI to build businesses, automate workflows,
              and create content since before most people knew what ChatGPT was.
              He runs multiple businesses and uses AI daily to save hours of work.
            </p>
          </div>
          <div className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <Image
                src="/james-headshot.jpg"
                alt="James Parris"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-navy">JAMES PARRIS</p>
                <p className="text-sm text-text/70">Local business operator</p>
              </div>
            </div>
            <p className="mt-4 text-base text-text/80">
              James is a local business owner and entrepreneur who's been in the
              trenches — running a deli, managing teams, and building businesses
              from scratch. He knows what small business owners actually need
              because he IS one.
            </p>
          </div>
        </div>
        <p className="mt-8 text-base font-semibold text-navy">
          We're not AI researchers. We're business owners who use AI every day
          to save time, make money, and work smarter. That's what we'll teach you.
        </p>
      </div>
    </section>
  );
}
