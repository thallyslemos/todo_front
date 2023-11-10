import { Card, CardHeader, Typography } from "@material-tailwind/react";

type CustomCardProps = {
  title: string;
  children: React.ReactNode;
};

const CustomCard = ({ children, title }: CustomCardProps) => {
  return (
    <Card className="mt-6 w-96 h-fit pt-2 my-auto shadow-lg bg-blue-gray-50">
      <CardHeader className="justify-center text-white bg-primary text-secondary">
        <Typography variant="h5" className="text-center">
          {title}
        </Typography>{" "}
      </CardHeader>
      {children}
    </Card>
  );
};
export default CustomCard;
