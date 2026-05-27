interface reviewType {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
}

const getRatingBoxColor = (rating: number): string => {
  switch (rating) {
    case 5:
      return "bg-green-400";
    case 4:
      return "bg-green-200";
    case 3:
      return "bg-yellow-300";
    case 2:
      return "bg-red-200";
    case 1:
      return "bg-red-400";
  }

  return "bg-gray-100"
}

export const CommentBox = ({ review }: { review: reviewType }) => {
  const { rating, comment, date, reviewerName, reviewerEmail } = review;

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="max-w-full rounded-2xl border border-zinc-200 bg-slate-100 p-5 shadow-sm transition hover:shadow-md">

      {/* Top Section */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex gap-2">
            <img src="../src/assets/user.svg" className="size-7" alt="user" />

            <h3 className="text-lg font-semibold text-zinc-900">
              {reviewerName}
            </h3>
          </div>

          <p className="text-sm text-zinc-500">
            {reviewerEmail}
          </p>
        </div>

        <span className={`rounded-full ${getRatingBoxColor(rating)} px-3 py-1 text-sm font-medium text-black`}>
          {String(rating)} ★
        </span>
      </div>

      {/* Review Comment */}
      <div className="mt-4">
        <p className="text-zinc-700 leading-relaxed">
          {comment}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3">

        <p className="text-sm text-zinc-400">
          Reviewed on {formattedDate}
        </p>

        <button className="text-sm font-medium text-blue-600 hover:text-red-600 hover:cursor-pointer">
          Report
        </button>
      </div>
    </div>
  )
}


