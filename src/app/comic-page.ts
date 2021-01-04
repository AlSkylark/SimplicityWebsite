/**
 * A class that contains the main comic parts, including image url and caption.
 */

export class ComicPage 
{
    imgurl: string;
    caption: string;
    id: number;
    alt: string;

    constructor(ImgUrl:string = "", ID: number = 0, Caption: string = "", Alt: string = "")
    {
        this.imgurl = ImgUrl;
        this.id = ID;
        this.caption = Caption;
        this.alt = Alt;
    }

    /**
     * This function is the life and blood of the ComicPage Class, with it you can 
     * swap the details of a Comic Page given a series of values or passing another
     * ComicPage class as a parameter.
     * @param ImgUrl The URL string of the image in the update.
     * @param ID The ID of the update.
     * @param Caption The Caption of the update.
     * @param Alt The alternative text to describe the image.
     */
    changePage(ImgUrl: string, ID?: number, Caption?: string, Alt?:string): void;
    /**
     * This function is the life and blood of the ComicPage Class, with it you can 
     * swap the details of a Comic Page given a series of values or passing another
     * ComicPage class as a parameter.
     * @param Comic The ComicPage class with details of the update.
     */
    changePage(Comic: ComicPage): void;
    /**
     * This function is the life and blood of the ComicPage Class, with it you can 
     * swap the details of a Comic Page given a series of values or passing another
     * ComicPage class as a parameter.
     * @param ComicOrImgUrl The ComicPage class or URL string of the image in the update.
     * @param ID The ID of the update.
     * @param Caption The Caption of the update.
     * @param Alt The alternative text to describe the image.
     */
    changePage(ComicOrImgUrl, ID?, Caption?, Alt?){
        if(typeof ComicOrImgUrl == "string")
        {
            this.imgurl = ComicOrImgUrl;
            if(ID != null) {this.id = ID}
            if (Caption != null) {this.caption = Caption};
            if (Alt != null) {this.alt = Alt};
        } 
        else 
        {
            this.imgurl = ComicOrImgUrl.imgurl;
            this.id = ComicOrImgUrl.id;
            this.caption = ComicOrImgUrl.caption;
            this.alt = ComicOrImgUrl.alt;
        }
    }
}
