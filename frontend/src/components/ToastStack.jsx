const variants = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
};

const ToastStack = ({ toasts }) => {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${variants[toast.type] || variants.info}`}
        >
          <p className="font-medium">{toast.title}</p>
          {toast.message ? (
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
