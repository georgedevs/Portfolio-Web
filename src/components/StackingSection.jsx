const StackingSection = ({ children, className }) => {

  return (
    <div className={`w-full min-h-screen sticky top-0 ${className}`}>
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default StackingSection;