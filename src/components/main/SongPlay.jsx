import {JumbotronSongPlay} from "../micro/jumbtrons/JumbotronSongPlay"
import { CarouselComp } from "../micro/gallery/Carousel"
import { CopyRight } from "../micro/footer/copyRight"
export default function SongPlay(){
    const items=[
        {
            cover:'/testImg/cover1.png',
            title:'The of the lord',
            id:'1'
        },
        {
            cover:'/testImg/cover2.png',
            title:'Rise of the Rome',
            id:'2'
        },
        {
            cover:'/testImg/cover3.png',
            title:'With jis blood and love',
            id:'3'
        },
        {
            cover:'/testImg/cover4.png',
            title:'Lord is my peace',
            id:'4'
        }
    ]
    const song=[
        {
            cover:'../../../../public/testImg/cover3.jpg',
            title:'With jis blood and love',
            id:'3',
            audio:'',
            artist:'Ass. Edwin Musasa',
            lyrics:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet molestias error optio eos? Accusantium sapiente eligendi, nam laborum earum cupiditate, commodi at numquam magni eius consectetur debitis odio voluptatibus asperiores exercitationem natus, ex fugit similique tempore ipsum. Asperiores consequatur corrupti at odio, fugiat rem ratione? Corporis quia odit at voluptates distinctio vitae maxime rerum. Rerum ex architecto ullam nulla, minima maxime soluta impedit itaque unde necessitatibus dolorum eaque in corrupti. Inventore ut dolore eaque, vero magnam id corporis facilis expedita ea architecto modi, at aliquam ex praesentium enim eius voluptas sunt? Soluta magni aperiam perferendis autem deserunt doloremque, qui modi vitae quis officia sapiente consectetur corporis mollitia saepe? A maxime maiores cum molestias. Voluptate maiores nemo exercitationem atque delectus natus debitis dolore! Voluptate asperiores quia nemo inventore omnis impedit maxime assumenda quaerat eum? Enim, fugiat officia ratione aliquam perferendis autem molestias totam quidem similique dolores a natus temporibus, officiis accusantium iusto porro? Distinctio, nihil odio. Praesentium, magni ab. Commodi id maiores similique praesentium ipsum a, ad nihil! Iure consequuntur quas harum molestiae nam ab dignissimos eum voluptatum placeat magni. Ea voluptatum cum deserunt hic fugiat molestiae eum nisi, quibusdam eius dolorum nostrum? Tempore odit veritatis voluptates quisquam esse distinctio?',
            ablum:'The word of love',

        },
    ]
    return(
        <>
           <div className="div flex flex-col justify-between bg-black min-h-screen">
                <JumbotronSongPlay song={song}/>
                {/* the carousel component takes an item props. */}
                <div className="div w-full xl:p-10">
                <CarouselComp items={items}/>
                </div>
                <CopyRight/>
           </div>
        </>
    )
}