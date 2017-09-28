class Shift{
    
    constructor(resources, name, postfix = '') {
        this.resources = resources;
        this.name = postfix === '' ? name : name + '-' + postfix;
        this.postfix = postfix;
    }
    
    render(){
        let style = '';
        let mediaPostfix = this.postfix === '' ? '' : '_' + this.postfix;

        if(this.resources.helpers.isPercentage(this.resources.settings.offset)){
            style += this.resources.styles.objToCallMedia(this.postfix, {
                margin: `{{var}}atom * {{var}}n + {{var}}offset${mediaPostfix}{{;}}`
            });
        }
        else{
            style += `{{var}}val{{=}}{{i}}calc(100% / {{string-var}}columns{{/string-var}} * {{string-var}}n{{/string-var}} + {{string-var}}offset${mediaPostfix}{{/string-var}}){{/i}}{{;}}\n`;
            style += this.resources.styles.objToCallMedia(this.postfix, {
                margin: '{{var}}val'
            });
        }

        let mixin = new this.resources.mixin(this.resources.patterns.mixin, this.name, '{{var}}n', (new this.resources.media()).wrap(style, 1));
        return mixin.render(this.resources.settings.outputStyle);
    }
}

module.exports = Shift;