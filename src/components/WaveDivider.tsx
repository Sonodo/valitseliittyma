export default function WaveDivider({
  color = '#F8FAFC',
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}
