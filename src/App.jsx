import AddProductForm from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
    return (
        <div className='flex w-full'>
            <div className='add w-1/4 mt-[50px]'>
                <AddProductForm />
            </div>
            <div className='product w-2/4'>
                <ProductList />
            </div>
            <div className='detaild w-1/3 mt-[50px]'>
                <ProductDetails id={3} />
            </div>
        </div>
    );
};

export default App;
