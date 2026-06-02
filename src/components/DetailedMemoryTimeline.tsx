import { journey } from '../content/journey';

function monthLabel(date: string) {
  const [year, month] = date.split('.');
  return `${year}.${month}`;
}

export function DetailedMemoryTimeline() {
  return (
    <ol className="detailed-memory-list">
      {journey.detailedTimeline.map((entry, index) => {
        const startsMonth = index === 0
          || monthLabel(entry.date) !== monthLabel(journey.detailedTimeline[index - 1].date);
        const featured = entry.id === 'beijing-birthday'
          || entry.id === 'camping-road-trip'
          || entry.id === 'farewell-day';

        return (
          <li
            key={entry.id}
            className={`detailed-memory-entry detailed-memory-entry-${entry.tone} ${featured ? 'is-featured' : ''}`}
          >
            {startsMonth ? <span className="detailed-memory-month">{monthLabel(entry.date)}</span> : null}
            <span className="detailed-memory-marker" aria-hidden="true">
              <i>{entry.icon}</i>
            </span>
            <article className="detailed-memory-note">
              <p>{entry.date}</p>
              <h3>{entry.title}</h3>
              <span>{entry.note}</span>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
