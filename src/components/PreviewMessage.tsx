import { Search } from "lucide-react";
import { Card } from "./ui/card";

const PreviewMessage = () => {
  return (
    <div className="container mx-auto px-4 mt-4">
      <Card className="w-full max-w-3xl mx-auto bg-[#FFE5DC] border-none shadow-none mb-8">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#FFBFAD] p-2 rounded-full">
              <Search className="h-5 w-5 text-[#1E2533]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1E2533]">You're in preview mode</h3>
              <p className="text-[#1E2533]/80">Create a free account to make changes</p>
            </div>
          </div>
          <div className="text-[#1E2533]">›</div>
        </div>
      </Card>
    </div>
  );
};

export default PreviewMessage;