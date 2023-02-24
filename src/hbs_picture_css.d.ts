declare module '*.png'
declare module '*.pcss'

declare module "*.hbs" {
    import { TemplateDelegate } from "handlebars/runtime";
    const template : TemplateDelegate;
    export default template;
}
