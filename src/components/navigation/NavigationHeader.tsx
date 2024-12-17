interface NavigationHeaderProps {
  userEmail?: string | null;
  onClose: () => void;
}

const NavigationHeader = ({ userEmail, onClose }: NavigationHeaderProps) => {
  const displayName = userEmail?.split('@')[0] || 'User';

  return (
    <div className="relative mb-6">
      <img 
        src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
        alt="MyMealPlan Logo" 
        className="h-16 w-auto mx-auto"
      />
      <p className="text-center mt-4 text-gray-600">
        Hi, {displayName}
      </p>
    </div>
  );
};

export default NavigationHeader;