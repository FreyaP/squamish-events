/* eslint-disable react/prop-types */
export default function FormatDate(props) {
  if (props) {
    const dateParts = props.split("-");

    const date = dateParts[2].split("T");

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[Number(dateParts[1]) - 1];

    let formattedDate = `${date[0]} ${month} ${dateParts[0]}`;
    return formattedDate;
  } else {
    return null;
  }
}
