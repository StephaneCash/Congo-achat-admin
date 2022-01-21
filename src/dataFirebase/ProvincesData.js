import React from 'react';

function ProvincesData() {
    return <div>
        {<div className="pics" key={index}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    subheader={val.subCategory}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={val.photos}
                />
                <CardActions disableSpacing>
                    <Typography>
                        <strong style={{ fontSize: '26px' }}>{val.productName}</strong> <br />
                        {val.province}, {val.city}
                    </Typography>
                    <Typography variant="h5"></Typography>
                </CardActions>
                <CardActions>
                    <Button variant='outlined' onClick={() => detailAnnonce(val.id)}>Détail</Button>
                </CardActions>
            </Card>
        </div>}
    </div>;
}

export default ProvincesData;
