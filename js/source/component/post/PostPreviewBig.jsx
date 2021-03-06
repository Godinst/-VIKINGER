const React = require('react');

const app = require('../../utils/core');

const IconSVG = require('../icon/IconSVG');

const TagList = require('../tag/TagList'),
      ContentActions = require('../content-actions/ContentActions');

class PostPreviewBig extends React.Component {
  constructor(props) {
    super(props);

    this.titleWordLimit = 70;
    this.excerptWordLimit = 400;

    this.coverStyle = props.data.cover_url ? {background: `url(${props.data.cover_url}) center center / cover no-repeat`} : {};

    this.categories = props.data.categories.slice(0, 3);

    this.format = this.props.data.format ? this.props.data.format : 'standard';
    this.supportedFormats = ['standard', 'video', 'audio', 'gallery'];
    this.supportedFormatsIcons = {
      standard: 'blog-posts',
      video: 'videos',
      audio: 'headphones',
      gallery: 'gallery'
    };
    this.postFormatIcon = this.supportedFormats.includes(this.format) ? this.supportedFormatsIcons[this.format] : this.supportedFormatsIcons.standard;
  }

  render() {
    return (
      <div className={`post-preview medium post-preview-normal animate-slide-down ${!this.props.data.cover_url ? 'post-preview-no-cover' : ''}`}>
      {
        this.props.data.cover_url &&
          <a href={this.props.data.permalink}>
            <div className="post-preview-image" style={this.coverStyle}></div>
          </a>
      }

        {/* POST PREVIEW INFO */}
        <div className="post-preview-info fixed-height">
        {
          !this.props.data.cover_url &&
            <div className="post-format-tag">
              <IconSVG modifiers="post-format-tag-icon" icon={this.postFormatIcon} />
            </div>
        }

          <div className="post-preview-info-top">
            <p className="post-preview-timestamp">
              {
                this.categories.map((category) => {
                  return (
                    <span key={category.id}><a href={category.link}>{category.name}</a> - </span>
                  );
                })
              }
              {this.props.data.timestamp}
            </p>

            <p className="post-preview-title medium">
              <a href={this.props.data.permalink} dangerouslySetInnerHTML={{__html: app.truncateText(this.props.data.title, this.titleWordLimit)}}></a>
            </p>
          </div>
          <div className="post-preview-info-bottom">
            <p className="post-preview-text" dangerouslySetInnerHTML={{__html: app.truncateText(this.props.data.excerpt, this.excerptWordLimit)}}></p>
            <a className="post-preview-link" href={this.props.data.permalink}>{vikinger_translation.read_more}</a>
          </div>
        </div>
        {/* POST PREVIEW INFO */}

        {/* TAG LIST */}
        <TagList tags={this.props.data.tags} />
        {/* TAG LIST */}

        {/* CONTENT ACTIONS */}
        <ContentActions reactionData={this.props.data.reactions}
                        link={this.props.data.permalink}
                        commentCount={this.props.data.comment_count}
                        shareCount={this.props.data.share_count}
        />
        {/* CONTENT ACTIONS */}
      </div>
    );
  }
}

module.exports = PostPreviewBig;