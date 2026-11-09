export default function PhotoCredit({ name }) {
  if (!name) return null;
  return <span className="photo-credit">{name}</span>;
}
