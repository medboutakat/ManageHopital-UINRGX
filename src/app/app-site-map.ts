import { NavItem } from "./shared/components/sidebar/nav-item.model";

export  class  SiteMap {
  public static menu: NavItem[] = [
    { displayName: "Dashboard", route: "/" },
    { displayName: "home", iconName: "home", route: "/home" },
    { displayName: "Store", iconName: "store", route: "/store" },
    {
      displayName: "management",
      iconName: "description",
      children: [
        {
          displayName: "Appointements",
          iconName: "home",
          route: "/appointement",
        },
        { displayName: "Hospital", iconName: "home", route: "/hospitals" },
        { displayName: "Doctors", iconName: "home", route: "/doctors" },
        { displayName: "Invoices", iconName: "invoice", route: "/invoices" },
        { displayName: "Invoice", iconName: "home", route: "/invoice" },
        { displayName: "Operations", iconName: "home", route: "/operation" },
        { displayName: "Products", iconName: "home", route: "/products" },
        { displayName: "material", iconName: "home", route: "/material" },
        {
          displayName: "material edit",
          iconName: "home",
          route: "/materialedit",
        },
        { displayName: "Payment", iconName: "home", route: "/payment" },
      ],
    },
    {
      displayName: "Settings",
      iconName: "group",
      children: [
        {
          displayName: "Búsqueda Perfil",
          iconName: "search",
          route: "/busquedaperfiles",
        },
        { displayName: "Tax", iconName: "tax", route: "/tax" },
        {
          displayName: "Customer category",
          iconName: "category",
          route: "/customercat",
        },
        {
          displayName: "Hospital category",
          iconName: "category",
          route: "/hospitalcat",
        },
        {
          displayName: "DoctorCategory",
          iconName: "category",
          route: "/doctorCategory",
        },
        {
          displayName: "ProductCategory",
          iconName: "category",
          route: "/productCategory",
        },
      ],
    },
  ];

  public static GetTitle(root: string) :string{
        

    console.log("root",root)
      this.menu.forEach(x=>{
        if (x.route==root) 
           return x.displayName;
        else{ 
          let indexmenu=x.children.findIndex((y)=>y.route==root);
          if (indexmenu != -1)  
             return x[indexmenu].displayName;
        }   
      }) ;
     
      return "";
    }
}
