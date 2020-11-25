/* eslint-disable react/no-unused-state */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-ProductReviewListtheme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import ContentWrapper from 'Component/ContentWrapper';
import ProductActions from 'Component/ProductActions';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductGallery from 'Component/ProductGallery';
import ProductInformation from 'Component/ProductInformation';
import ProductLinks from 'Component/ProductLinks';
import ProductReviews from 'Component/ProductReviews';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';

import './ProductPage.style';

/** @namespace Route/ProductPage/Component */
export class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        device: DeviceType.isRequired
    };
    constructor(props){
      super(props);
      this.state = {
        description: true,
        reviews: false,
      };
    }
    renderProductPageContent() {
        const {
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateConfigurableVariant,
            productOrVariant,
            areDetailsLoaded,
            getSelectedCustomizableOptions,
            productOptionsData,
            setBundlePrice,
            selectedBundlePrice
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ productOrVariant }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductActions
                  getLink={ getLink }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  product={ dataSource }
                  productOrVariant={ productOrVariant }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  configurableVariantIndex={ configurableVariantIndex }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  productOptionsData={ productOptionsData }
                  setBundlePrice={ setBundlePrice }
                  selectedBundlePrice={ selectedBundlePrice }
                />
            </>
        );
    }

    renderCustomizableOptions() {
        const {
            dataSource: { options },
            getSelectedCustomizableOptions,
            productOptionsData,
            device
        } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <ProductCustomizableOptions
              options={ options || [] }
              getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
              productOptionsData={ productOptionsData }
            />
        );
    }

    renderAdditionalSections() {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;
        return (
            <>
                { this.renderCustomizableOptions() }
                <div className="ProductPage-Navbar">
                  <div className="Toggler-Wraper" 
                  style={{background: this.state.description ? "var(--secondary-base-color)" : 'white'}}>
                <a aria-label="About"
                onClick={() => { this.setState({description: true,reviews: false})}}>About</a>
                </div>
                <div className="Toggler-Wraper"
                style={{background: !this.state.description && !this.state.reviews
                 ? "var(--secondary-base-color)" : 'white'}}>
                <a aria-label="Details" 
                onClick={() => { this.setState({description: false,reviews: false})}}>Details</a>
                </div>
                <div className="Toggler-Wraper"
                style={{background: this.state.reviews ? "var(--secondary-base-color)" : 'white'}}>
                <a aria-label="Reviews"
                onClick={() => { this.setState({description: false,reviews: true})}}>Reviews</a>
                </div>
                </div>
               { 
               !this.state.reviews && <ProductInformation
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                  description = {this.state.description}
               />}
               {  
                this.state.reviews && <ProductReviews
                  product={ dataSource }
                  areDetailsLoaded={ areDetailsLoaded }
                />}
                <ProductLinks
                  linkType={ RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  linkType={ UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    render() {
        return (
            <main
              block="ProductPage"
              aria-label="Product page"
              itemScope
              itemType="http://schema.org/Product"
            >
                <ContentWrapper
                  wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                  label={ __('Main product details') }
                >
                    { this.renderProductPageContent() }
                </ContentWrapper>
                { this.renderAdditionalSections()}
            </main>
        );
    }
}

export default ProductPage;
