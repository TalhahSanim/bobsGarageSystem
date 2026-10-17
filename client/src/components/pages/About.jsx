export default function About() {
  return (
    <>
      <h1 className="my-8 text-4xl font-bold md:text-5xl">
        Bob's Garage Mechnaicals
      </h1>
      <h3 className="mb-2 text-xl font-semi-bold">How we Started</h3>
      <p className="mb-6 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet.
      </p>

      {/* Photo by Mehmet Talha Onuk on Unsplash: https://unsplash.com/photos/8t6tk7LYLrE */}
      <img
        src="https://images.unsplash.com/photo-1727893119356-1702fe921cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        alt="Bright, spacious auto repair workshop with mechanics in red uniforms servicing cars on blue vehicle lifts"
        className="w-full rounded-lg"
      />
    </>
  );
}
