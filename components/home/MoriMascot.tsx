export default function MoriMascot() {
  return (
    <div className="mori-stage" aria-label="Mori thinking mascot">
      <div className="mori-ring mori-ring-one" />
      <div className="mori-ring mori-ring-two" />

      <div className="mori-body-wrap">
        <div className="mori-head">
          <div className="mori-eye mori-eye-left" />
          <div className="mori-eye mori-eye-right" />
          <div className="mori-mouth-glow" />
        </div>

        <div className="mori-body" />
        <div className="mori-shadow" />
      </div>

      <div className="mori-dot mori-dot-one" />
      <div className="mori-dot mori-dot-two" />
      <div className="mori-dot mori-dot-three" />
    </div>
  );
}