import Card from "../layout/Card";

export default function Home() {
  return (
    <>
      <h1 className="my-8 text-4xl font-bold md:text-5xl">
        Hello, Bob's Garage is Here
      </h1>
      <p className="mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas
        voluptate dolores nemo, quaerat blanditiis cum illo consequuntur, a
        velit sequi expedita, ratione nam incidunt recusandae molestias
        reprehenderit commodi!
      </p>

      <h2 className="mb-2 text-2xl font-semi-bold">Services</h2>
      <ul className="mb-6 list-disc ps-6">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          amet.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          praesentium!
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          totam.
        </li>
      </ul>

      <div className="grid gird-cols-1 justify-items-center gap-6 md:grid-cols-3">
        <Card src="https://placehold.co/600x400" />
        <Card />
        <Card />
      </div>
    </>
  );
}
