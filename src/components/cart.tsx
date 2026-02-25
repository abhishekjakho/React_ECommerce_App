import { useState } from "react";
import 
{ Dialog, DialogTitle, DialogContent,DialogActions, Button,Badge,Divider,Box,Typography,IconButton,Stack,} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type {CartItem} from './products'

type CartProps = {
  items: CartItem[];
  onRemove: (item: CartItem) => void;
  clearCart : ()=>void;
};

const CartButton: React.FC<CartProps> = ({ items, onRemove,clearCart }) => {
  const [open, setOpen] = useState(false);
  const totalPrice = items.reduce((sum, item) => sum + item.price*item.quantity, 0);
  return (
    <div className="margin-left pad-20">
        <Button onClick={() => setOpen(true)} className="logo react backgroundnil"
          sx={{
            gap: 1,
            px: 1.25,
            py: 0.75,
            borderRadius: 2,
            textTransform: "none",
            color: "text.primary",
            "&:hover": { backgroundColor: "action.hover" },
          }}> <img className='topbarbuttons limitwidth'/>
        <Badge badgeContent={items.length} color="error" sx={{ mr: 0.5 }}>
        <ShoppingCartIcon className="colorwhite"/>
      </Badge>
      <Typography variant="subtitle1" component="h4" className="inline colorwhite">
          Cart
      </Typography>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth
        maxWidth="sm"
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}>
    {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <DialogTitle
            sx={{ flex: 1, m: 0, p: 0, fontWeight: 700, fontSize: 20 }}
          >
            Cart Details
          </DialogTitle>
          <IconButton
            aria-label="Close"
            onClick={() => setOpen(false)}
            size="small"
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />
        
{/* Body */}
        <DialogContent sx={{ px: 2, pt: 2, pb: 0 }}>
          {items.length === 0 ? (
            <Typography color="text.secondary">No products added yet.</Typography>
          ) : (
            <>
              <Stack component="ul" sx={{ listStyle: "none", p: 0, m: 0, gap: 1.5 }}>
                {items.map((item) => (
                  <Box
                    component="li"
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "96px 1fr auto auto",
                      alignItems: "center",
                      gap: 2,
                      p: 1,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      // Mobile collapse
                      "@media (max-width:600px)": {
                        gridTemplateColumns: "72px 1fr auto",
                        gridTemplateAreas: `
                          "img info remove"
                          "img price price"
                        `,
                        gap: 1.25,
                      },
                    }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        width: 96,
                        height: 96,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: (t) => `1px solid ${t.palette.divider}`,
                        gridArea: { xs: "img", sm: "auto" },
                      }}
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Box>

                    {/* Info */}
                    <Box sx={{ minWidth: 0, gridArea: { xs: "info", sm: "auto" } }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, lineHeight: 1.25 }}
                        noWrap
                        title={item.title}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: <b>{item.quantity}</b>
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        minWidth: 72,
                        textAlign: "right",
                        gridArea: { xs: "price", sm: "auto" },
                      }}
                    >
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    {/* Remove */}
                    <IconButton
                      color="error"
                      onClick={() => onRemove(item)}
                      sx={{ gridArea: { xs: "remove", sm: "auto" } }}
                      aria-label={`Remove ${item.title}`}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Total Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>

        {/* Footer */}
        <DialogActions
          sx={{
            px: 2,
            py: 1.5,
            borderTop: (t) => `1px solid ${t.palette.divider}`,
            gap: 1,
          }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setOpen(false);
              clearCart();
            }}
          >
            Clear Cart
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
  
};

export default CartButton;

{/* <Button variant="contained" onClick={() => setOpen(true)}>
    Open Popup
</Button> */}
        // <DialogContent>
        //         {items.length === 0 ? (
        //             <p>No products added yet.</p>
        //             ) : (
        //                 <><ul>
        //                       {items.map((item) => (
        //                           <li key={item.id}>
        //                               <img className="smallimg" src={item.images[0]}></img>
                                      
        //                                 {item.title} -<b> {item.quantity} </b>- <b>${item.price*item.quantity}</b>
                                      
        //                               <Button
        //                                   color="error"
        //                                   size="small"
        //                                   onClick={() => onRemove(item)}
        //                                   style={{ marginLeft: "10px", alignContent: "end" }}>
        //                                   Remove
        //                               </Button>
        //                           </li>
        //                       ))}
        //                   </ul>
        //                     <Divider style={{ margin: "20px 0" }} />
        //                     <h4 style={{ marginTop: "20px", textAlign:'center' }}>
        //                           Total: ${totalPrice.toFixed(2)}
        //                     </h4></>

        //         )}
        //         <Button 
        //         color="warning" 
        //         onClick={() => {
        //         setOpen(false); // close dialog
        //         clearCart();    // call clearCart from App
        //           }}
        //         >
        //           Clear Cart
        //         </Button>
        //   <Button onClick={() => setOpen(false)}>Close</Button>
        // </DialogContent>