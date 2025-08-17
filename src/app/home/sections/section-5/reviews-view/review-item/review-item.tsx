import { Button } from "@/shared/components/button/button";
import { Card } from "@/shared/components/card/card";
import { Icon } from "@/shared/components/icon/icon";
import { forwardRef, useState } from "react";


export interface ReviewItemProps {
    photo: string;
    name: string;
    review: string;
    key: number;
}

export const ReviewItem = forwardRef<(HTMLDivElement|null), ReviewItemProps>(({ photo, name, review }: ReviewItemProps, ref) => {

    const [openState, setOpenState] = useState(true);

    return <div className={`review-item ${openState ? 'open' : ''}`} ref={ref}>
        <img src={`/images/home/customers/${photo}.png`} alt={name} />
        <Card color={{ color: 'white', alpha: '25' }}>
            <h3>{name}</h3>
            <p>{review}</p>
            <Button circle color={{ color: 'white', alpha: '100' }} onClick={() => setOpenState(!openState)}>
                <Icon icon={'arrow-down-2'} color={{ color: 'black' }} />
            </Button>
        </Card>
    </div>
})