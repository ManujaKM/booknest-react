import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    text: 'This app completely changed how I manage my reading list. The interface is so clean.',
    rating: 5
  },
  {
    name: 'James K.',
    text: 'I have discovered so many amazing books through BookNest. The community is fantastic.',
    rating: 5
  },
  {
    name: 'Priya L.',
    text: 'The ISBN scanner is so fast and accurate. Love it!',
    rating: 5
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Loved by Book Lovers Worldwide
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-slate-200 bg-white p-6 hover:-translate-y-1 transition">
              <div className="flex items-center gap-1 text-[var(--amber-500)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${review.name}-star-${index}`}
                    size={18}
                    className={index < review.rating ? 'fill-current' : 'text-slate-200'}
                  />
                ))}
              </div>
              <p className="mt-4 text-slate-600">"{review.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[var(--amber-500)] text-slate-900 flex items-center justify-center font-semibold">
                  {review.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">{review.name}</p>
                  <p className="text-xs text-slate-500">Verified Reader</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
