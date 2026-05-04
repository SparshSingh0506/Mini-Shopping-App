export const AvailabilityStatus = ({availabilityStatus} : {availabilityStatus: string}) => {
  return (
    <span className={`text-xs ${availabilityStatus === "In Stock"
      ? "text-green-600"
      : "text-red-600"}`}
    >
      {availabilityStatus}
    </span>
  )
}
