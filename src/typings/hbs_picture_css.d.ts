declare module '*.png'
declare module '*.pcss' {
    const styles:   Record<string, string>;  
    export default styles;  
} 
declare module "*.hbs" {
    import { TemplateDelegate } from "handlebars";
    const template : TemplateDelegate;
    export default template;
}
