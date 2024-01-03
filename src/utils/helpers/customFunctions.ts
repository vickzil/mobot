export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j (single line)
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const removeDuplicateId = (arr: any) => {
  return arr
    .map((e: any) => e["id"])
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
    .filter((obj: any) => arr[obj])
    .map((e: any) => arr[e]);
};

export const debounce_leading = (func: any, timeout = 300) => {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const formateDateByName = (newDate: any) => {
  const d = new Date(newDate);
  const year = d.getFullYear(); // 2019
  const date = d.getDate();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  const formatted = ` ${date < 10 ? "0" + date : date} ${monthName} ${year}`;

  return formatted;
};

export const handleAddRemoveData = (
  array: any,
  data: any,
  movieType: string
) => {
  let isRemoved: boolean = false;
  let returnedData = [];
  let newData = data;
  newData.movieType = movieType;
  if (array && array?.length > 0) {
    let alreadyAdded = array?.find((item: any) => item.id === newData?.id);

    if (alreadyAdded) {
      let removedData = array?.filter(
        (item: any) => item?.id !== alreadyAdded?.id
      );

      if (removedData) {
        returnedData = removedData;
        isRemoved = true;
      }
    } else {
      let prevFavourite = [...array, newData];
      returnedData = prevFavourite;
      isRemoved = false;
    }
  } else {
    returnedData = [newData];
    isRemoved = false;
  }
  return { returnedData, isRemoved };
};

export const calculateAge = (date: any) => {
  const newDate: any = new Date(date);
  const now: any = new Date();
  const diff = Math.abs(now - newDate);
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return age;
};
