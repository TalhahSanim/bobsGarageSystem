// Login & Register layout on the  left -> Photo left and message on left and the form on right
import heroImage from "../../assets/hero-image.jpg";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="full-screen -my-10 grid bg-surface md:min-h-170 md:grid-cols-2">
      {/* image like same with hero's tinting */}
      <div
        className="relative min-h-48 bg-cover bg-center md:min-h-140"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-linear-to-b from-hero/85 to-hero-red/55 p-8 text-white">
          <p className="font-heading text-4xl font-medium">{title}</p>
          <p className="max-w-sm text-white/90">{subtitle}</p>
        </div>
      </div>

      {/* Form goes here ⬇️ */}
      <div className="flex items-center p-8 md:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}
