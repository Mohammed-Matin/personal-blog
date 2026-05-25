export const tagOptions = ["all", "technical", "brainrot", "cultural"];

export const tagStyles = {
  technical: "bg-sky-100 text-sky-800 ring-sky-200",
  brainrot: "bg-amber-100 text-amber-800 ring-amber-200",
  cultural: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  all: "bg-slate-100 text-slate-700 ring-slate-200",
};

export const formatArticleDate = (value) => {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const truncateText = (value, limit = 180) => {
  if (!value) {
    return "";
  }

  return value.length > limit ? `${value.slice(0, limit).trim()}...` : value;
};
