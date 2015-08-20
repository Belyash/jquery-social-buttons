# Social Share Buttons
![Social Share Buttons](social-share-buttons.png)

Social Share Buttons with Counters: Facebook, VK, Twitter, LinkedIn, Pinterest.

## Demo
jQuery Plugin version [Codepen Demo](http://codepen.io/Belyash/full/qdzVgx/)

## How to use
HTML markup:
<pre>
&lt;span class="fa fa-facebook" data-social="fb" data-count="..."&gt;Facebook&lt;/span&gt;
&lt;span class="fa fa-vk" data-social="vk" data-count="..."&gt;Facebook&lt;/span&gt;
&lt;span class="fa fa-twitter" data-social="tw" data-count="..."&gt;Facebook&lt;/span&gt;
&lt;span class="fa fa-linkedin" data-social="ln" data-count="..."&gt;Facebook&lt;/span&gt;
&lt;span class="fa fa-pinterest" data-social="pt" data-count="..."&gt;Facebook&lt;/span&gt;
</pre>
JavaScript Code:
<pre>
$('[data-social]').socialShares({
    url: 'http://belyash.github.io'
});
</pre>