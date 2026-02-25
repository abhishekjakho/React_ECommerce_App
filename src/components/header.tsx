//Creating Header Component

import logo from '../AppLogo.jpg';
import '../App.css'
import CartButton from './cart';
import type {CartItem} from './products'
import Searchbox from './searchbox';

type HeaderProps = {
  cart: CartItem[];
  onRemove: (item: CartItem) => void;
  Search : string;
  SetSearch: React.Dispatch<React.SetStateAction<string>>;
  clearCart : () =>void;
};

const header: React.FC<HeaderProps> = ({ cart, onRemove,Search, SetSearch,clearCart })=>{
    return(
    <div className="App">
        <header className="App-header">
            <button className='logo backgroundnil' ><img className='topbarbuttons' src={logo}/></button>
            <h1 className='App-title'>Clone Flip</h1>
            <Searchbox search={Search} setSearch={SetSearch} />
            <CartButton items={cart} onRemove={onRemove} clearCart={clearCart}/>
        </header>
    </div>
    )
}

export default header;
            
            
{/* <button className="logo react backgroundnil margin-left"> <img className='topbarbuttons limitwidth' src={cart}/>
<h4 className='inline'> Welcome User</h4>   
</button> */}