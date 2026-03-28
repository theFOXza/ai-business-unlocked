const agendaItems = [
  { time: '8:30 AM', label: '☕ Registration + Coffee & Setup' },
  { time: '9:00 AM', label: '🎤 Welcome + "Why AI, Why Now"' },
  { time: '9:20 AM', label: '🧠 Module 1: AI Foundations + Your First Win' },
  { time: '10:30 AM', label: '☕ Break' },
  { time: '10:45 AM', label: '🔧 Module 2: Build Real Business Assets' },
  { time: '12:00 PM', label: '🥪 Lunch Break (optional bonus AI demo for those who stay)' },
  { time: '1:00 PM', label: '⚡ Module 3: Workflows & Automation' },
  { time: '2:15 PM', label: '☕ Break' },
  { time: '2:30 PM', label: '🎯 Module 4: 1-on-1 Implementation for YOUR Business' },
  { time: '3:30 PM', label: '🚀 Community Launch + Your 7-Day AI Challenge' },
  { time: '4:00 PM', label: '🎬 Closing + Group Photo' },
];

export default function Agenda() {
  return (
    <section className="py-16">
      <div className="container-pad">
        <h2 className="section-title">Your Day, Hour by Hour</h2>
        <div className="mt-8 grid gap-4">
          {agendaItems.map((item) => (
            <div
              key={item.time}
              className="flex flex-col gap-2 rounded-2xl border border-blue/10 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-lg font-semibold text-navy">{item.time}</span>
              <span className="text-base text-text/80">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base font-semibold text-navy">
          Every session is hands-on. You'll have something working before lunch.
        </p>
      </div>
    </section>
  );
}
