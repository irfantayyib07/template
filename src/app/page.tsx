type Order = {
 orderTitle: string;
 employeeName: string;
 customerPrice: string;
 remainingAmount: string;
};

type HomePageProps = {
 orders: Order[];
};

export default function Home() {
 return (
  <>
   <div>Homepage</div>
  </>
 );
}
