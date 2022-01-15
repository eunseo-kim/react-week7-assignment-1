export default function ReviewForm({ onClick }) {
  return (
    <>
      <div>
        <label
          name="score"
          htmlFor="review-score"
        >
          평점
        </label>
        <input
          type="text"
          id="review-score"
        />
      </div>
      <div>
        <label
          name="score"
          htmlFor="review-score"
        >
          리뷰 내용
        </label>
        <input
          type="text"
          id="review-score"
        />
      </div>
      <button
        type="button"
        onClick={onClick}
      >
        리뷰 남기기
      </button>
    </>
  );
}