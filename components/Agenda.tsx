const scheduleItems = [
  {
    time: '8:30 AM',
    title: 'Registration + Coffee & Setup',
    type: 'Arrival',
    variant: 'break',
  },
  { time: '9:00 AM', title: 'Welcome' },
  {
    time: '9:20 AM',
    title: 'Module 1: AI Foundations + Your First Win',
    type: 'Workshop',
    variant: 'module',
  },
  { time: '10:30 AM', title: 'Break', type: '15 min', variant: 'break' },
  {
    time: '10:45 AM',
    title: 'Module 2: Build Real Business Assets',
    type: 'Workshop',
    variant: 'module',
  },
  {
    time: '12:00 PM',
    title: 'Lunch Break',
    type: '+ Optional bonus AI demo',
    variant: 'break',
  },
  {
    time: '1:00 PM',
    title: 'Module 3: Workflows & Automation',
    type: 'Workshop',
    variant: 'module',
  },
  { time: '2:15 PM', title: 'Break', type: '15 min', variant: 'break' },
  {
    time: '2:30 PM',
    title: 'Module 4: 1-on-1 Implementation for YOUR Business',
    type: 'Featured',
    variant: 'featured',
  },
  {
    time: '3:30 PM',
    title: 'Community Launch + Your 7-Day AI Challenge',
    type: 'Workshop',
    variant: 'module',
  },
  { time: '4:00 PM', title: 'Closing + Group Photo' },
];

export default function Agenda() {
  return (
    <section className="section section-offset" id="schedule">
      <div className="container">
        <div className="section-label reveal">The Day Itself</div>
        <h2 className="section-title reveal reveal-delay-1">Your day, hour by hour</h2>
        <p className="section-desc reveal reveal-delay-2">
          Every session is hands-on. You&apos;ll have something working before lunch.
        </p>

        <div className="schedule-timeline">
          {scheduleItems.map((item, index) => {
            const isModule = item.variant === 'module' || item.variant === 'featured';
            return (
              <div
                key={`${item.time}-${index}`}
                className={`schedule-item${isModule ? ' schedule-item-module' : ''} reveal`}
              >
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-dot" aria-hidden="true">
                  <div className={`dot-inner${isModule ? ' dot-active' : ''}`}></div>
                </div>
                <div className="schedule-content">
                  <strong>{item.title}</strong>
                  {item.type && (
                    <span
                      className={`schedule-type${
                        item.variant === 'break'
                          ? ' schedule-type-break'
                          : item.variant === 'featured'
                            ? ' schedule-type-featured'
                            : ''
                      }`}
                    >
                      {item.type}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
