export const MeetingBtn = () => {
  const { setShowWindow, setShowMeeting } = useWindowContext();
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setShowWindow(true);
        setShowMeeting(true);
      }}
    >
      Schedule Meeting
    </button>
  );
};
