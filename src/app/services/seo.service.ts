import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultTitle = 'Steel Valley Range - Sportowa Strzelnica Długodystansowa';
  private defaultDescription = 'Steel Valley Range to profesjonalna sportowa strzelnica długodystansowa. Oferujemy treningi strzeleckie, zawody i szkolenia dla miłośników strzelectwa sportowego.';
  private defaultKeywords = 'strzelnica, strzelectwo sportowe, strzelectwo długodystansowe, trening strzelecki, zawody strzeleckie, Steel Valley Range';

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  updateSeo(data: SeoData): void {
    // Update title
    const pageTitle = data.title 
      ? `${data.title} | ${this.defaultTitle}`
      : this.defaultTitle;
    this.title.setTitle(pageTitle);

    // Update meta description
    this.meta.updateTag({
      name: 'description',
      content: data.description || this.defaultDescription
    });

    // Update meta keywords
    this.meta.updateTag({
      name: 'keywords',
      content: data.keywords || this.defaultKeywords
    });

    // Update author
    if (data.author) {
      this.meta.updateTag({
        name: 'author',
        content: data.author
      });
    }

    // Update robots
    this.meta.updateTag({
      name: 'robots',
      content: data.robots || 'index, follow'
    });

    // Update Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: data.ogTitle || pageTitle
    });

    this.meta.updateTag({
      property: 'og:description',
      content: data.ogDescription || data.description || this.defaultDescription
    });

    if (data.ogImage) {
      this.meta.updateTag({
        property: 'og:image',
        content: data.ogImage
      });
    }

    if (data.ogUrl) {
      this.meta.updateTag({
        property: 'og:url',
        content: data.ogUrl
      });
    }

    // Update Twitter Card tags
    this.meta.updateTag({
      property: 'twitter:title',
      content: data.ogTitle || pageTitle
    });

    this.meta.updateTag({
      property: 'twitter:description',
      content: data.ogDescription || data.description || this.defaultDescription
    });

    if (data.ogImage) {
      this.meta.updateTag({
        property: 'twitter:image',
        content: data.ogImage
      });
    }

    // Update canonical URL
    if (data.canonicalUrl) {
      this.updateCanonicalUrl(data.canonicalUrl);
    }
  }

  updateCanonicalUrl(url: string): void {
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  addStructuredData(data: object): void {
    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  resetToDefault(): void {
    this.updateSeo({});
  }

  //TODO: update urls
  // Convenience methods for specific page types
  setLandingPageSeo(): void {
    this.updateSeo({
      title: 'Strona Główna',
      description: 'Steel Valley Range - profesjonalna sportowa strzelnica długodystansowa. Zapraszamy do zapoznania się z naszą ofertą treningów strzeleckich i zawodów.',
      keywords: 'strzelnica, strzelectwo sportowe, strzelectwo długodystansowe, trening strzelecki',
      canonicalUrl: 'https://steelvalleyrange.pl/'
    });
  }

  setAboutPageSeo(): void {
    this.updateSeo({
      title: 'O Nas',
      description: 'Poznaj historię i misję Steel Valley Range. Jesteśmy profesjonalną strzelnicą sportową z pasją do strzelectwa długodystansowego.',
      keywords: 'o strzelnicy, historia strzelectwa, Steel Valley Range o nas',
      canonicalUrl: 'https://steelvalleyrange.pl/o-nas'
    });
  }

  setContactPageSeo(): void {
    this.updateSeo({
      title: 'Kontakt',
      description: 'Skontaktuj się z Steel Valley Range. Znajdź naszą lokalizację, numer telefonu i adres email. Zapraszamy do kontaktu!',
      keywords: 'kontakt, strzelnica kontakt, lokalizacja strzelnicy',
      canonicalUrl: 'https://steelvalleyrange.pl/kontakt'
    });
  }
}
