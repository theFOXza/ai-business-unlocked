const forYou = [
  'You own or run a small business',
  "You're curious but overwhelmed",
  'You want practical, not theory',
  "You're in the Gainesville area",
  'You can bring a laptop',
];

const notForYou = [
  'You want to become an AI engineer',
  "You're already an advanced AI user",
  'You just want to watch, not do',
  "You're looking for a magic button",
  "You don't have a business to apply it to",
];

export default function WhoItsFor() {
  return (
    <section className="py-16 bg-blue/5">
      <div className="container-pad">
        <h2 className="section-title">Is This Workshop For You?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
            <p className="text-lg font-semibold text-navy">THIS IS FOR YOU IF:</p>
            <ul className="mt-4 space-y-2 text-base text-text/80">
              {forYou.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-blue/10 bg-white p-6 shadow-soft">
            <p className="text-lg font-semibold text-navy">THIS IS NOT FOR YOU IF:</p>
            <ul className="mt-4 space-y-2 text-base text-text/80">
              {notForYou.map((item) => (
                <li key={item}>❌ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
