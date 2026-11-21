
export default function PricingCard({
  name,
  price,
  features,
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <h2 className="w-fit rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
        {name}
      </h2>
      <p className="mt-5 text-2xl font-extrabold text-slate-900">
        {price}
      </p>

      <hr className="my-3 border-slate-200" />
      <ul className="flex-1 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-xs font-semibold leading-5 text-slate-500">
            <span className="font-bold text-emerald-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 w-full rounded-xl bg-blue-600 px-2 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
        Enroll in {name}
      </button>

    </div>
  );
}
