export const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className='bi bi-star-fill text-warning'></span>);
    }
    if (hasHalfStar) {
      stars.push(
        <span key='half' className='bi bi-star-half text-warning'></span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={stars.length} className='bi bi-star text-muted'></span>
      );
    }
  
    return stars;
  };