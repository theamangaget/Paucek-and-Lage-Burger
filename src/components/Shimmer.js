const Shimmer = () => {
    return (
        <div>
            <div className="Shimmer-filter">
                <div className="Shimmer-search-bar">
                    <div className="shimmer-search-box"></div>
                    <div className="shimmer-search-btn"></div>
                </div>
                <div className="shimmer-filter-btn"></div>
            </div>
            <div className="Shimmer-container">
                {[...Array(15)].map((_, i) => (
                    <div className="Shimmer-card" key={i}>
                        <div className="shimmer-line"></div>
                        <div className="shimmer-line short"></div>
                        <div className="shimmer-line short"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Shimmer;